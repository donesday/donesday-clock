const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:4000'
  , 'webpack/hot/only-dev-server'
  , './src/index.js'
  , './src/style.css'
    ]

, output: {
    filename: 'index.js'
  , chunkFilename: "[id].js"
  , path: __dirname + '/public/'
  , libraryTarget: 'umd'
  }

, module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot'], include: path.join(__dirname, 'src') }
    , { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    , { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
    , { test: /\.css$/, exclude: /node_modeuls/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
    ]
  }

, plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css", {allChunks: true})
  ]

, devtool: "#source-map"
}
