// @ts-check
/* eslint perfectionist/sort-objects: "error" */
// import antfu from '@antfu/eslint-config'

import { arvinn } from '@arvinn/eslint-config'

export default arvinn(
  [
    {
      rules: {
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
