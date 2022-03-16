module.exports = {
  extends: ['algolia', 'algolia/react'],
  rules: {
    'eslint-comments/disable-enable-pair': 0,
    // Enforce function declaration for components
    'react/function-component-definition': [
      'error',
      {
        'named-components': 'function-declaration',
      },
    ],
    // Allow boolean props without explicit values
    'react/jsx-boolean-value': 0,
    // Allow JSX content in .js files
    'react/jsx-filename-extension': 0,
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
