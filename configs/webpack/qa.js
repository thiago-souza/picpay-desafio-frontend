// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

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
    new HtmlWebpackPlugin({
      template: './template-test.html.ejs',
      favicon: './favicon-cartola.png',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/robots.txt', to: 'robots.txt' }],
    }),
    new Dotenv({
      path: './.env-qa', // load this now instead of the ones in '.env'),
    }),
  ],
});
