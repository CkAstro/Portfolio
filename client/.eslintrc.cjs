/* eslint-env node */
/*
    Rules in this file are in the same order as they appear in the docs sites to make it easy to find. (Usually this is alphabetical but sometimes there's subgroups.)
    ESLint Rule Documentation Sites:
        https://eslint.org/docs/latest/rules/
        https://github.com/jsx-eslint/eslint-plugin-react
        https://github.com/import-js/eslint-plugin-import
        https://github.com/testing-library/eslint-plugin-testing-library
        https://github.com/jest-community/eslint-plugin-jest
        https://typescript-eslint.io/rules/
        https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
*/

module.exports = {
   plugins: [
      '@typescript-eslint',
      'react',
      'react-hooks',
      'jsx-a11y',
      'jest',
      'testing-library',
      'import',
   ],
   extends: '../.eslintrc.cjs',
   env: {
      es2022: true,
      browser: true,
   },
   reportUnusedDisableDirectives: true,
   parser: '@babel/eslint-parser',
   parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: {
         jsx: true,
         impliedStrict: true,
      },
      sourceType: 'module',
      requireConfigFile: false,
   },
   settings: {
      react: {
         pragma: 'React',
         version: 'detect',
      },
   },
   overrides: [
      {
         parser: '@typescript-eslint/parser',
         parserOptions: {
            sourceType: 'module',
            project: './tsconfig.json',
            tsconfigRootDir: __dirname,
         },
         files: ['*.ts', '*.tsx'],
         rules: {
            // TypeScript ESLint Core Disables - https://typescript-eslint.io/docs/linting/configs#eslint-recommended
            'constructor-super': 'off',
            'getter-return': 'off',
            'no-const-assign': 'off',
            'no-dupe-args': 'off',
            'no-dupe-class-members': 'off',
            'no-dupe-keys': 'off',
            'no-func-assign': 'off',
            'no-import-assign': 'off',
            'no-new-symbol': 'off',
            'no-obj-calls': 'off',
            'no-redeclare': 'off',
            'no-setter-return': 'off',
            'no-this-before-super': 'off',
            'no-undef': 'off',
            'no-unreachable': 'off',
            'no-unsafe-negation': 'off',
            'valid-typeof': 'off',
            // TypeScript - https://typescript-eslint.io/rules/
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/array-type': 'warn',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/ban-ts-comment': 'error',
            '@typescript-eslint/ban-types': 'error',
            '@typescript-eslint/consistent-generic-constructors': ['warn', 'constructor'],
            '@typescript-eslint/consistent-type-assertions': [
               'warn',
               {
                  assertionStyle: 'as',
                  objectLiteralTypeAssertions: 'allow-as-parameter',
               },
            ],
            '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/explicit-function-return-type': [
               'warn',
               {
                  allowTypedFunctionExpressions: true,
               },
            ],
            '@typescript-eslint/explicit-member-accessibility': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/member-delimiter-style': 'warn',
            '@typescript-eslint/method-signature-style': 'warn',
            '@typescript-eslint/naming-convention': [
               'warn',
               {
                  selector: [
                     'classProperty',
                     'objectLiteralProperty',
                     'typeProperty',
                     'classMethod',
                     'objectLiteralMethod',
                     'typeMethod',
                     'accessor',
                     'enumMember',
                  ],
                  format: null,
                  modifiers: ['requiresQuotes'],
               },
               {
                  selector: 'default',
                  format: ['camelCase'],
               },
               {
                  selector: ['function', 'enumMember', 'property'],
                  format: ['camelCase', 'PascalCase'],
               },
               {
                  selector: 'parameter',
                  format: ['camelCase'],
                  modifiers: ['unused'],
                  leadingUnderscore: 'allow',
               },
               {
                  selector: ['variable'],
                  modifiers: ['const'],
                  format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
               },
               {
                  selector: 'typeLike',
                  format: ['PascalCase'],
               },
               {
                  selector: 'typeProperty',
                  format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
               },
            ],
            '@typescript-eslint/no-base-to-string': 'error',
            '@typescript-eslint/no-confusing-non-null-assertion': 'error',
            '@typescript-eslint/no-confusing-void-expression': [
               'error',
               {
                  ignoreArrowShorthand: true,
                  ignoreVoidOperator: true,
               },
            ],
            '@typescript-eslint/no-empty-interface': 'warn',
            '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/no-extraneous-class': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-for-in-array': 'error',
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-namespace': 'warn',
            '@typescript-eslint/no-redundant-type-constituents': 'warn',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-this-alias': 'warn',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-unnecessary-qualifier': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-call': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/no-useless-empty-export': 'warn',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
            '@typescript-eslint/parameter-properties': 'error',
            '@typescript-eslint/prefer-as-const': 'warn',
            '@typescript-eslint/prefer-for-of': 'warn',
            '@typescript-eslint/prefer-namespace-keyword': 'warn',
            '@typescript-eslint/prefer-nullish-coalescing': [
               'warn',
               {
                  ignoreTernaryTests: false,
               },
            ],
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/prefer-readonly': 'warn',
            '@typescript-eslint/prefer-return-this-type': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
            '@typescript-eslint/prefer-ts-expect-error': 'warn',
            '@typescript-eslint/require-array-sort-compare': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/restrict-template-expressions': 'error',
            '@typescript-eslint/strict-boolean-expressions': [
               'error',
               {
                  allowString: false,
                  allowNumber: false,
                  allowNullableObject: false,
               },
            ],
            '@typescript-eslint/triple-slash-reference': 'warn',
            '@typescript-eslint/unified-signatures': 'warn',
            // TypeScript Extension Rules - https://typescript-eslint.io/rules/#extension-rules
            'default-param-last': 'off',
            '@typescript-eslint/default-param-last': 'error',
            'no-array-constructor': 'off',
            '@typescript-eslint/no-array-constructor': 'error',
            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': 'warn',
            'no-implied-eval': 'off',
            '@typescript-eslint/no-implied-eval': 'error',
            'no-invalid-this': 'off',
            '@typescript-eslint/no-invalid-this': 'error',
            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': 'error',
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': [
               'error',
               {
                  ignoreOnInitialization: true,
               },
            ],
            'no-throw-literal': 'off',
            '@typescript-eslint/no-throw-literal': [
               'error',
               {
                  allowThrowingAny: false,
                  allowThrowingUnknown: false,
               },
            ],
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
               'warn',
               {
                  argsIgnorePattern: '^_',
                  destructuredArrayIgnorePattern: '^_',
               },
            ],
            'require-await': 'off',
            '@typescript-eslint/require-await': 'error',
         },
      },
      {
         // JSX A11y - This plugin is being extended because there's an extensive amount of custom options automatically configured. - https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
         extends: ['plugin:jsx-a11y/recommended', 'plugin:react/jsx-runtime'],
         files: ['*.jsx', '*.tsx'],
         rules: {
            // React - https://github.com/jsx-eslint/eslint-plugin-react#list-of-supported-rules
            'react/function-component-definition': [
               'warn',
               {
                  namedComponents: 'arrow-function',
               },
            ],
            'react/hook-use-state': 'warn',
            'react/iframe-missing-sandbox': 'warn',
            'react/no-access-state-in-setstate': 'error',
            'react/no-array-index-key': 'error',
            'react/no-children-prop': 'error',
            'react/no-danger': 'error',
            'react/no-danger-with-children': 'error',
            'react/no-deprecated': 'error',
            'react/no-did-mount-set-state': 'error',
            'react/no-did-update-set-state': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-find-dom-node': 'error',
            'react/no-invalid-html-attribute': 'warn',
            'react/no-is-mounted': 'error',
            'react/no-redundant-should-component-update': 'error',
            'react/no-render-return-value': 'error',
            'react/no-string-refs': 'error',
            'react/no-this-in-sfc': 'error',
            'react/no-typos': 'error',
            'react/no-unknown-property': 'error',
            'react/no-unused-state': 'warn',
            'react/require-render-return': 'error',
            'react/self-closing-comp': 'warn',
            'react/void-dom-elements-no-children': 'error',
            // JSX-specific rules - https://github.com/jsx-eslint/eslint-plugin-react#jsx-specific-rules
            'react/jsx-boolean-value': ['warn', 'always'],
            'react/jsx-curly-brace-presence': ['warn', 'never'],
            'react/jsx-fragments': 'warn',
            'react/jsx-key': [
               'error',
               {
                  checkFragmentShorthand: true,
                  checkKeyMustBeforeSpread: true,
                  warnOnDuplicates: true,
               },
            ],
            'react/jsx-no-comment-textnodes': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/jsx-no-script-url': 'error',
            'react/jsx-no-target-blank': 'warn',
            'react/jsx-no-undef': 'error',
            'react/jsx-no-useless-fragment': [
               'warn',
               {
                  allowExpressions: true,
               },
            ],
            'react/jsx-pascal-case': 'warn',
            'react/jsx-props-no-spreading': 'warn',
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            // Other
            'no-restricted-imports': [
               'warn',
               {
                  patterns: [],
                  paths: [
                     {
                        name: 'react',
                        importNames: ['default'],
                        message:
                           "'import React' is not needed due to the new JSX transform: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html\n\nIf you need a named export, use: 'import { Something } from \"react\"'",
                     },
                  ],
               },
            ],
         },
      },
      {
         files: ['*.test.jsx', '*.test.tsx'],
         rules: {
            // React Testing Library - https://github.com/testing-library/eslint-plugin-testing-library
            'testing-library/await-async-query': 'error',
            'testing-library/await-async-utils': 'error',
            'testing-library/no-await-sync-query': 'error',
            'testing-library/no-container': 'error',
            'testing-library/no-debugging-utils': 'warn',
            'testing-library/no-dom-import': ['error', 'react'],
            'testing-library/no-global-regexp-flag-in-query': 'warn',
            'testing-library/no-node-access': 'warn',
            'testing-library/no-unnecessary-act': 'warn',
            'testing-library/no-wait-for-empty-callback': 'error',
            'testing-library/no-wait-for-multiple-assertions': 'error',
            'testing-library/no-wait-for-side-effects': 'error',
            'testing-library/no-wait-for-snapshot': 'error',
            'testing-library/prefer-find-by': 'warn',
            'testing-library/prefer-presence-queries': 'error',
            'testing-library/prefer-query-by-disappearance': 'error',
            'testing-library/prefer-screen-queries': 'warn',
            'testing-library/prefer-user-event': 'error',
            'testing-library/prefer-wait-for': 'warn',
            'testing-library/render-result-naming-convention': 'error',
            // Jest - https://github.com/jest-community/eslint-plugin-jest
            'jest/expect-expect': [
               'warn',
               {
                  assertFunctionNames: [
                     'expect',
                     '*.getBy*',
                     '*.getAllBy*',
                     '*.findBy*',
                     '*.findAllBy*',
                  ],
               },
            ],
         },
      },
   ],
   rules: {
      // React Hooks - https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      // React - https://github.com/jsx-eslint/eslint-plugin-react
      'react/jsx-filename-extension': [
         'error',
         {
            extensions: ['.jsx', '.tsx'],
         },
      ],
   },
};
