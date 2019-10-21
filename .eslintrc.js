module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
  ],
  plugins: ['jest', 'jsx-control-statements', 'react'],
  parser: 'babel-eslint',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',

    'key-spacing': ['error', {
      afterColon  : true,
      align       : 'colon',
      beforeColon : true,
      mode        : 'minimum',
    }],

    'max-len': ['error', { code : 100, comments : 150 }],
    'no-multi-str': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': ['error', { 'consistent': true }],
    'operator-linebreak': ['error', 'after'],
    'react/jsx-curly-spacing' : ['error', 'always'],
    'react/jsx-no-undef': ['error', { 'allowGlobals': true }],
    'react/sort-comp': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },

    react: {
      version: 'detect',
    },
  }
};
