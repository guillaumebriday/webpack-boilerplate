const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name]-[hash].js'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    before: function () {
      console.log('[wds]: Project is running at http://localhost:8080')
    }
  },

  plugins: [new webpack.HotModuleReplacementPlugin()]
})
