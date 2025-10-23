const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
          test: /\.s[ac]ss$/i,
          use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ],
            
  },

  
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
  ],
  mode: 'development',
  devtool: 'source-map',
};
