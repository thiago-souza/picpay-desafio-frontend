// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: '@/pages/index.tsx',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AMBIENTE': JSON.stringify('prod'),
      'process.env.API_URL': JSON.stringify(' '),
      'process.env.OIDC_KEY': JSON.stringify(' '),
    }),
  ],
});
