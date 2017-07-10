const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = function (env) {
  return {
    entry: {
      app: SRC_DIR + '/app.js',
    },
    output: {
      publicPath: '/',
      filename: '[name].bundle.js',
      path: DIST_DIR,
    },
    resolve: {
      alias: {
        assets: path.resolve(SRC_DIR, 'assets'),
      },
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        })
      }, {
        test: /\.(jpg|png|svg)$/,
        use: [{
          loader: 'file-loader',
          query: {
            outputPath: 'assets/images/',
          }
        }],
      }]
    },

    plugins: [
      new ExtractTextPlugin({
        filename: '[name].bundle.css',
        allChunks: true,
        disable: env === 'dev',
      }),
      new HtmlPlugin({
        template: SRC_DIR + '/index.html',
      }),
      new webpack.NamedModulesPlugin(),
    ],
  };
};
