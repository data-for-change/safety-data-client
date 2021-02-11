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
  rules: {
    'linebreak-style': ['warn', 'windows'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'max-len': ['warn', { code: 130, tabWidth: 4 }],
    '@typescript-eslint/no-unused-vars': 'error',
  },
};

// see also .env file (DISABLE_ESLINT_PLUGIN=true)
// and the bug it fixes for 4.0.2 Create React App
// https://github.com/facebook/create-react-app/pull/10170
