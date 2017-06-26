const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index.jsx',
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
  },
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 3000,
    hot: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.svg'],
    alias: {
      components: path.resolve(__dirname, 'client/src/components'),
      containers: path.resolve(__dirname, 'client/src/containers'),
    },
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|svg|png|gif)$/i,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
};
