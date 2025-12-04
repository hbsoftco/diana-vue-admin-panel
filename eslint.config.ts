import antfu from '@antfu/eslint-config'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'

export default antfu(
  {
    formatters: true,
    vue: true,
    typescript: true,

    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
    ],
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
