import antfu from '@antfu/eslint-config'
import pluginPlaywright from 'eslint-plugin-playwright'

export default antfu(
  {
    formatters: true,
    vue: true,
    typescript: true,

    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '.codex/**'],
  },
  {
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/first-attribute-linebreak': 'off',
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['off'],
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          ignore: [
            'README.md',
            'AGENTS.md',
            'CLAUDE.md',

            'ARCHITECTURE.md',
            'PROJECT_STRUCTURE.md',
            'CODE_CONVENTIONS.md',
            'DEVELOPMENT_GUIDE.md',
            'PROJECT_BASELINE.md',
            'CONTRIBUTING.md',

            '0001-project-architecture.md',
            '0002-folder-structure.md',
            '0003-component-library.md',
            '0004-routing.md',
            '0005-typescript-style.md',
          ],
        },
      ],
    },
  },

  // ========================================
  // 🎭 Playwright Rules
  // ========================================
  {
    name: 'playwright-rules',
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    plugins: {
      playwright: pluginPlaywright,
    },
    rules: {
      ...pluginPlaywright.configs['flat/recommended'].rules,
    },
  },
)
