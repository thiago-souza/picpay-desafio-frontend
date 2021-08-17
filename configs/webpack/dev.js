// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://0.0.0.0:8088', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    '@/pages/index-dev.tsx', // the entry point of our app
  ],
  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    host: '0.0.0.0',
    port: 8088,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template-test.html.ejs',
      favicon: './favicon-cartola.png',
    }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally,
    new Dotenv({
      path: './.env.development', // load this now instead of the ones in '.env'),
    }),
  ],
});
