//  @ts-check

import globals from 'globals'
import react from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import { tanstackConfig } from '@tanstack/eslint-config'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tanstackConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: true,
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: true,
      },
    },
    rules: {
      ...reactRecommended.rules,
      semi: ['error'],
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-useless-catch': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'object-curly-spacing': ['error', 'always'],
      indent: ['error', 4],
      'brace-style': ['error', '1tbs'],

      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          groups: [
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],

      quotes: ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],

      'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],
      // 'react/jsx-one-expression-per-line': ['error'],
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-indent': ['error', 4],
      'react/jsx-indent-props': ['error', 4],
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],
      'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
    },
  },
  {
    ignores: [
      'build/**/*',
      'dist/**/*',
      '.next/**/*',
      '**/gen/*',
      'server.js',
      'public/service-worker.js',
    ],
  },
]
