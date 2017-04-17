var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './app/index.js',
    // vendor: [
    //   'lodash',
    //   'moment'
    // ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest'], // 指定公共 bundle 的名字。
    // })

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
      name: 'manifest'
    }),

    new ExtractTextPlugin('style.css'),
  ]
};
