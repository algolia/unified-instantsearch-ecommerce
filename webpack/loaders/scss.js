export default {
  rules: [
    {
      test: /\.(s?css)$/,
      use: ['css-loader', 'postcss-loader', 'sass-loader'],
    },
  ],
};
