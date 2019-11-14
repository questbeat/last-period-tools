module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'react-app',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      }
    ],
  }
};
