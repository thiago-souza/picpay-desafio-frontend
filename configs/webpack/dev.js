// development config
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

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
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally,
    new webpack.DefinePlugin({
      AMBIENTE: JSON.stringify('dev'),
      API_URL: JSON.stringify('https://sce-accounts.mybackstage.qa.globoi.com'),
      OIDC_KEY: JSON.stringify('cartola-kyc@apps.globoid'),
    }),
  ],
});
