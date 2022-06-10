module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': 0,
        '@typescript-eslint/no-shadow': ['error'],
        'quotes': [1, 'single', 'avoid-escape'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-duplicate-imports': 'error',
        'no-const-assign': 'error',
        'no-var': 'error',
      },
    },
  ],
};