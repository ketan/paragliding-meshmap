import pluginJs from '@eslint/js'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import pluginReactJSXConfig from 'eslint-plugin-react/configs/jsx-runtime.js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    ignores: ['build/**', 'public/assets/**', 'frontend/dist/**', 'eslint.config.js'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  pluginReactConfig,
  pluginReactJSXConfig,
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
  },

  {
    rules: {
      curly: ['error'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^ignore',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
