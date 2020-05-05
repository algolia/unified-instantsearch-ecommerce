import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default [
  new CopyPlugin([
    {
      from: '**/*',
      ignore: ['index.html'],
      context: './public/',
    },
  ]),
  new HtmlWebpackPlugin({
    title: 'Unified InstantSearch E-commerce',
    template: 'public/index.html',
  }),
];
