module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  ignorePatterns: [
    'node_modules/*',
    'megalinter-reports/*',
    'playwright-report/*',
    'test-results/*'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    // 'project': ['./tsconfig.json'],
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  root: true,
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-multiple-empty-lines': [
      'error',
      { max: 1 }
    ],
    'no-explicit-any': [
      'off'
    ],
    'semi-spacing': [
      'error',
      { 'before': false, 'after': true }
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ]
  }
};
