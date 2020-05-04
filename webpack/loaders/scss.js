export default {
  rules: [
    {
      test: /\.(scss)$/,
      use: ['css-loader', 'postcss-loader', 'sass-loader'],
    },
  ],
};
