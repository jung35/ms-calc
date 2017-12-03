const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  output: {
    publicPath: './dist/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'index.html'],{
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/template.ejs',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings 
          }, {
            loader: "css-loader" // translates CSS into CommonJS 
          }, {
            loader: "sass-loader", options: { // compiles Sass to CSS 
              sourceMap: false,
              includePaths: ["sass"],
              importLoaders: 1
            } 
          }, {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')()
              ]
            }
          }
        ]
      },
    ]
  }
})