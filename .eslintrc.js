module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'ignorePatterns': [
    'node_modules/*',
    'megalinter-reports/*',
    'playwright-report/*',
    'test-results/*',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    // 'project': ['./tsconfig.json'],
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'root': true,
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
