module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'linebreak-style': ['warn', 'windows'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'max-len': ['warn', { code: 130, tabWidth: 4 }],
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.test.jsx'] }],
  },
};

// see also .env file (DISABLE_ESLINT_PLUGIN=true)
// and the bug it fixes for 4.0.2 Create React App
// https://github.com/facebook/create-react-app/pull/10170
