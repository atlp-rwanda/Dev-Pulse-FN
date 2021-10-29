require('dotenv/config.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { API_URL, JWT_KEY, NODE_ENV } = process.env;

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /(\.(s[ac]|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './',
    port: '5000',
    hot: true,
  },
  mode: NODE_ENV,
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(API_URL),
      'process.env.JWT_KEY': JSON.stringify(JWT_KEY),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
};
