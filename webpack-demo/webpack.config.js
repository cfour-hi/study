var path = require('path');
var webpack = require('webpack');

module.exports = function (env) {
  return {
    entry: {
      app: './app/index.js',
      vendor: 'lodash'
    },
    output: {
      filename: '[chunkhash].[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'mainfest']
      })
    ]
  }
}
