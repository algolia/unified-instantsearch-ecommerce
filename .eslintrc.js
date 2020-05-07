module.exports = {
  extends: ['algolia', 'algolia/react'],
  rules: {
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'eslint-comments/disable-enable-pair': 0,
    // Avoid errors about `UNSAFE` lifecycles (e.g. `UNSAFE_componentWillMount`)
    'react/no-deprecated': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
