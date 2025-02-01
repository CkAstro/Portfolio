/* eslint-env node */

module.exports = {
   plugins: ['@typescript-eslint', 'jest', 'import'],
   extends: '../.eslintrc.cjs',
   env: { node: true },
   reportUnusedDisableDirectives: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
   },
   rules: {
      // add server-side rules here
   },
};
