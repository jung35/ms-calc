const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/template.ejs',
      inject: 'body'
    }),
    new ExtractTextPlugin("[name]-[hash].css")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env','react']
        }
      },
      {
      test: /\.scss$/,
      use: [{
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
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }]
  }
};