import 'ignore-styles';

import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../../src/config/index';

export default [
  new CopyPlugin({
    patterns: [
      {
        from: '**/*',
        context: './public/',
        globOptions: {
          ignore: ['index.ejs'],
        },
      },
    ],
  }),
  new HtmlWebpackPlugin({
    title: 'Unified InstantSearch E-commerce',
    template: 'public/index.ejs',
    templateParameters: {
      appId: config.appId,
      netlify: process.env.NETLIFY || false,
    },
  }),
];
