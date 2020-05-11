import 'ignore-styles';

import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../../src/config/index';

export default [
  new CopyPlugin([
    {
      from: '**/*',
      ignore: ['index.ejs'],
      context: './public/',
    },
  ]),
  new HtmlWebpackPlugin({
    title: 'Unified InstantSearch E-commerce',
    template: 'public/index.ejs',
    templateParameters: {
      appId: config.appId,
    },
  }),
];
