const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const resolvePath = (url) => path.resolve(__dirname, '../', url);


module.exports = {
  entry: {
    index: resolvePath('src/main.tsx')
  },
  output: {
    path: resolvePath('dist'),
    filename: '[name].[contenthash].js'
  },
  devServer: {
    inline: true,
    port: 8001
  },
  devtool: "source-map",
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
      rules: [
          {test: /\.(ts|tsx)$/, use: [{loader: 'awesome-typescript-loader'}] },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ],
      rules: [
        { test: /\.ts[x]?$/, exclude: /node_modules/, use: ['babel-loader','ts-loader'] }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('static/index.html'),
      inject: 'body'
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
    alias: {
      "components": resolvePath("src/components"),
      "utils": resolvePath("src/utils"),
    }
  }
};