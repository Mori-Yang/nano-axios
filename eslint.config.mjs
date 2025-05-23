import tsEslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
export default [
  { ignores: ['dist'] },
  ...tsEslint.configs.recommended,
  {
    rules: {
      'prefer-template': ['warn'],
      'no-useless-concat': ['error'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  stylistic.configs.recommended,
  {
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/indent': ['error', 2],
    },
  },
]
