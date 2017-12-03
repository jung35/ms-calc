const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(['dist'],{
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'src/template.ejs',
      inject: 'body'
    }),
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
              sourceMap: true,
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