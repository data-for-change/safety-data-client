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
    'jest',
  ],
  rules: {
    'linebreak-style': ['warn', 'windows'],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-unresolved" : "off",
    "import/extensions": ['warn', "never" ],
    'max-len': ["warn", { "code": 130, "tabWidth": 4 }],
    "radix": ["warn", "as-needed"],
  },
};
