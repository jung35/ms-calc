const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name]-[hash].js"
  },
  plugins: [
    new ExtractTextPlugin("[name]-[hash].css")
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ["transform-object-rest-spread"]
        }
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      }, {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}