// @ts-check
/* eslint perfectionist/sort-objects: "error" */
// import antfu from '@antfu/eslint-config'

import { arvinn } from '@arvinn/eslint-config'

export default arvinn(
  [
    {
      ignores: ['output-lib/*'],
    },
    {
      rules: {
        'import/no-default-export': 'off',
        'no-labels': 'off',
        'no-lone-blocks': 'off',
        'no-restricted-syntax': 'off',
        'node/prefer-global/buffer': 'off',
        'node/prefer-global/process': 'off',
        'prefer-rest-params': 'off',
        'symbol-description': 'off',
        'ts/ban-types': 'off',
        'ts/no-invalid-this': 'off',
        'ts/no-unnecessary-type-constraint': 'off',
        'unicorn/filename-case': 'off',
        'vue/no-template-shadow': 'off',
        'vue/no-v-text-v-html-on-component': 'off',
      },
    },
    {
      files: ['src/**/*.ts'],
      rules: {
        'perfectionist/sort-objects': 'error',
      },
    },
    {
      files: ['**/*.md/*'],
      rules: {
        'sort-imports': 'off',
      },
    },
  ],

  {
    prettier: true,
    vue: true,
  },
)
