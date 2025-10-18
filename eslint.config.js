// eslint.config.js
import js from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintComments from 'eslint-plugin-eslint-comments';
import importPlugin from 'eslint-plugin-import';
import promise from 'eslint-plugin-promise';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import vitest from '@vitest/eslint-plugin';
import regexp from 'eslint-plugin-regexp';
import security from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import testingLibrary from 'eslint-plugin-testing-library';


const commonFiles = '**/*.{js,jsx,cjs,mjs,ts,tsx}';
const reactFiles= '**/*.{ts,tsx,jsx}';
const tsFiles = '**/*.{ts,tsx}';
const testFiles = '**/*.{test,spec}.{js,jsx,ts,tsx}';
const scriptsFiles = 'scripts/**/*.{ts,tsx}';

const commonPlugins = {
  promise,
  unicorn,
  'import': importPlugin,
  'eslint-comments': eslintComments,
  regexp,
  'unused-imports': unusedImports,
  'simple-import-sort': simpleImportSort,
  security,
};

const coreRules = {
  'no-restricted-syntax': ['error', 'WithStatement', 'LabeledStatement'],
  'no-console': 'off',
};

const promiseRules = {
  'promise/no-return-wrap': 'error',
  'promise/param-names': 'error',
  'promise/catch-or-return': 'error',
  'promise/no-nesting': 'warn',
  'promise/no-promise-in-callback': 'warn',
  'promise/no-callback-in-promise': 'warn',
  'promise/no-new-statics': 'error',
  'promise/no-return-in-finally': 'warn',
  'promise/valid-params': 'warn',
};

const unicornRules = {
  'unicorn/prevent-abbreviations': 'off',
  'unicorn/no-null': 'off',
  'unicorn/prefer-switch': 'off',
  'unicorn/prefer-logical-operator-over-ternary': 'warn',
  'unicorn/no-await-expression-member': 'error',
};

const importRules = {
  'import/no-extraneous-dependencies': 'off',
  'import/order': 'off',
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/no-cycle': 'error',
  'unused-imports/no-unused-imports': 'error',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
};

const eslintCommentsRules = {
  'eslint-comments/disable-enable-pair': 'error',
  'eslint-comments/no-unlimited-disable': 'error',
  'eslint-comments/no-unused-disable': 'error',
};

const regexpRules = {
  'regexp/no-empty-capturing-group': 'error',
  'regexp/no-lazy-ends': 'error',
};

const securityRules = {
  'security/detect-object-injection': 'off',
  'security/detect-non-literal-regexp': 'off',
  'security/detect-non-literal-fs-filename': 'off',
};


const typeScriptRules = {
  ...tseslintPlugin.configs.recommended.rules,
  'no-redeclare': 'off', // Turn off base rule
  '@typescript-eslint/no-redeclare': 'error', // Use TypeScript-aware version
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
};

const reactRules = {
  ...react.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
  'react/prop-types': 'off', // TypeScript handles prop validation
  'react/display-name': 'off', // Not needed with modern React
  'react/no-unescaped-entities': 'warn',
  'react/jsx-uses-react': 'off', // React 17+ JSX transform
  'react/jsx-uses-vars': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

const reactRefreshRules = {
  'react-refresh/only-export-components': [
    'warn',
    {
      allowConstantExport: true,
      checkJS: false,
    },
  ],
};

export default [
  // Ignore patterns
  {
    ignores: [
      '**/{dist,build,coverage,.bun}/**',
      '**/node_modules/**',
      '**/*.lock',
      '**/README.md',
      '**/package.json',
      'examples/**',
    ],
  },

  // Base configuration
  js.configs.recommended,

  // Common JavaScript/TypeScript rules
  {
    files: [commonFiles],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          importAttributes: true,
        },
      },
      globals: {
        Bun: 'readonly',
        ...globals.node,
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: commonPlugins,
    settings: {
      'import/resolver': { typescript: true },
    },
    rules: {
      ...coreRules,
      ...promiseRules,
      ...unicornRules,
      ...importRules,
      ...eslintCommentsRules,
      ...regexpRules,
      ...securityRules,
    },
  },

  // TypeScript-specific rules
  {
    files: [tsFiles],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: typeScriptRules,
  },

  // Test file overrides
  {
    files: [testFiles],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  {
    files: [scriptsFiles],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      globals: {
        Bun: 'readonly',
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: typeScriptRules,
  },

  {
    files: [testFiles, 'test/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        chrome: 'readonly',
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
        test: 'readonly',
        // Testing Library globals (from setup)
        screen: 'readonly',
        within: 'readonly',
        getByRole: 'readonly',
        getByText: 'readonly',
        getByLabelText: 'readonly',
        getByTestId: 'readonly',
        queryByRole: 'readonly',
        queryByText: 'readonly',
        waitFor: 'readonly',
        fireEvent: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      vitest,
      'testing-library': testingLibrary,
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typeScriptRules,
      // Relaxed rules for tests
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'promise/catch-or-return': 'off',
      'promise/no-callback-in-promise': 'off',
      'import/first': 'off',
      // Vitest-specific rules
      ...vitest.configs.recommended.rules,
      'vitest/expect-expect': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-have-length': 'error',
      // Testing Library rules
      ...testingLibrary.configs.react.rules,
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'error',
      // React rules for tests
      ...reactRules,
    },
  },
  {
    files: [reactFiles],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typeScriptRules,
      ...reactRules,
      ...reactRefreshRules,
    },
  },
];
