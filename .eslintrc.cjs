module.exports = {
  env: {
    es2022: true,
    node: true,
    'node/test': true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // project-specific overrides can go here
  },
};
