module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "import/no-unresolved" : "off",
    "import/extensions": ['error', "never" ],
    'max-len': ["error", { "code": 130, "tabWidth": 4 }],
    "radix": ["error", "as-needed"],
  },
};
