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
    title: 'E-Comm Unified UI',
    template: 'public/index.html',
  }),
];
