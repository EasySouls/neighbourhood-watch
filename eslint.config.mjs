import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: [
      '**/node_modules/',
      '**/.tamagui/',
      '__tests__/',
      'android/',
      '.vscode/',
      '.idea/',
      'dist/',
      'build/',
      'coverage/',
      '.gitignore',
      'babel.config.js',
      'metro.config.js',
      'tamagui.config.js',
    ],
  },
];

// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     tsconfigRootDir: __dirname,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     '@react-native-community',
//     'plugin:@typescript-eslint/recommended',
//     'prettier',
//     'prettier/@typescript-eslint',
//   ],
//   ignorePatterns: ['.prettierrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//     '@typescript-eslint/no-empty-function': 'off',
//     '@typescript-eslint/no-extra-semi': 'off',
//     '@typescript-eslint/no-unused-vars': 'error',
//   },
// };
