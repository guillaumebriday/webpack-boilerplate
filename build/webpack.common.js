/* eslint-disable no-useless-escape */

const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const generateHTMLPlugins = () => glob.sync('./src/views/*.pug').map(dir => {
  return new HTMLWebpackPlugin({
    filename: path.basename(dir, '.pug') + '.html',
    template: dir
  })
})

module.exports = {
  entry: {
    app: [
      resolve('src/js/app.js'),
      resolve('src/stylesheets/app.sass')
    ]
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: [
              'raw-loader',
              {
                loader: 'pug-plain-loader',
                options: {
                  pretty: process.env.NODE_ENV !== 'production'
                }
              }
            ]
          }
        ]
      },
      {
        test: /\.(png|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'assets/'
          }
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'fonts/',
            publicPath: '../fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WebpackNotifierPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackAssetsManifest({
      integrity: false,
      entrypoints: true
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Dotenv({
      path: resolve('.env'),
      systemvars: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
      chunkFilename: 'css/[name]-[contenthash:8].chunk.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './public/',
        to: './'
      }
    ]),
    ...generateHTMLPlugins()
  ]
}
