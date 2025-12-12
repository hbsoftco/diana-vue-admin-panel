import antfu from '@antfu/eslint-config'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'

export default antfu(
  {
    formatters: true,
    vue: true,
    typescript: true,

    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
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
          ignore: ['README.md'],
        },
      ],
    },
  },

  // ========================================
  // 🧪 Vitest Rules
  // ========================================
  {
    name: 'vitest-rules',
    files: ['src/**/__tests__/*', '**/*.test.ts', '**/*.spec.ts'],
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
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
