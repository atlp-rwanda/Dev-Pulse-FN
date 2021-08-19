require('dotenv/config.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { API_URL,JWT_KEY } = process.env;

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  mode: process.env.NODE_ENV || 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': { API_URL: JSON.stringify(API_URL),JWT_KEY:JSON.stringify(JWT_KEY)},
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
  ]
}