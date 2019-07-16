module.exports = {
  extends: ['airbnb'], 
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'always',
      { 'js': 'never', 'jsx': 'never', 'ts': 'never', 'tsx': 'never', 'd.ts': 'never' }
    ]
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'] }
    }
  },
  overrides: [
    {
      files: ['**/*'],
      rules: {
        'linebreak-style': 'off',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-restricted-globals': 'off',
        'object-curly-spacing': ['error', 'never'],
        'import/prefer-default-export': 'off',
        'import/no-cycle': 'off',
        'no-extra-semi': 'error',
        'react/no-array-index-key': 'warn',
        'newline-before-return': 'error',
        'no-unused-vars': 'warn',
        quotes: 'error',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
        'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
      }
    },
    {
      files: ['**/*.tsx', '**/*.ts'],
      parser: 'typescript-eslint-parser',
      plugins: ['typescript'],
      rules: {
        'no-undef': 'off',
        'typescript/no-unused-vars': 'warn',
        'react/sort-comp': [
          'error',
          {
            order: [
              'static-methods',
              'vars',
              'lifecycle',
              'everything-else',
              'render'
            ],
            groups:{
              vars: [
                'instance-variables',
                'type-annotations',
              ]
            }
          }
        ]
      }
    }
  ]
}