module.exports = {
  extends: ['algolia', 'algolia/react'],
  rules: {
    'eslint-comments/disable-enable-pair': 0,
    'import/order': 0,
    'no-param-reassign': 0,
    'react/function-component-definition': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-no-bind': 0,
    // Avoid errors about `UNSAFE` lifecycles (e.g. `UNSAFE_componentWillMount`)
    'react/no-deprecated': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
};
