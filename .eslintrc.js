module.exports = {
  extends: ['algolia', 'algolia/react'],
  rules: {
    'eslint-comments/disable-enable-pair': 0,
    // Do not enforce a specific import order
    'import/order': 0,
    // Allow function components
    'react/function-component-definition': 0,
    // Allow boolean props without explicit values
    'react/jsx-boolean-value': 0,
    // Allow JSX content in .js files
    'react/jsx-filename-extension': 0,
    // Do not enforce event listeners naming conventions
    'react/jsx-handler-names': 0,
    // Allow passing function references to event listeners
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
