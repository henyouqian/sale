var path = require('path');
var webpack = require('webpack');
var dev = require('./webpack.config.dev.js')

module.exports = Object.assign(dev, {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ]
})

// module.exports = {
//   devtool: 'source-map',
//   entry: {
//     vendor: ["jquery", "fastclick", "react", "react-dom", "uikit", "lschache", "./src/lwUtil"],
//     index:['webpack-hot-middleware/client', './src/index'],
//     itemPage:['webpack-hot-middleware/client', './src/itemPage'],
//     cardPage:['webpack-hot-middleware/client', './src/cardPage']
//   },
//   output: {
//     path: path.join(__dirname, 'site/dist'),
//     filename: "[name].entry.js",
//     publicPath: '/dist/'
//   },
//   plugins: [
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': JSON.stringify('production')
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compressor: {
//         warnings: false
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loaders: ['babel'],
//         include: path.join(__dirname, 'src')
//       },{ 
//         test: /\.css$/,
//         loader: "style-loader!css-loader" 
//       }
//     ]
//   }
// };
