var path = require('path');
var webpack = require('webpack');

// module.exports = {
//   devtool: 'eval',
//   entry: [
//     'webpack-hot-middleware/client',
//     './src/index'
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/static/'
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//   ],
//   module: {
//     loaders: [{
//       test: /\.js$/,
//       loaders: ['babel'],
//       include: path.join(__dirname, 'src')
//     }]
//   }
// };

module.exports = {
  devtool: 'eval',
  entry: {
    vendor: ["jquery", "fastclick", "react", "react-dom", "velocity-animate", "uikit", "lscache", "./src/lwUtil"],
    index:['webpack-hot-middleware/client', './src/index'],
    onLogin:['webpack-hot-middleware/client', './src/onLogin'],
    qrLogin:['webpack-hot-middleware/client', './src/qrLogin'],
    qrLoginWeixin:['webpack-hot-middleware/client', './src/qrLoginWeixin'],
    itemPage:['webpack-hot-middleware/client', './src/itemPage'],
    cardPage:['webpack-hot-middleware/client', './src/cardPage'],
    itemList:['webpack-hot-middleware/client', './src/itemList']
  },
  output: {
    path: path.join(__dirname, 'site/dist'),
    filename: "[name].entry.js",
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin("common.js"),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },{ 
        test: /\.css$/,
        loader: "style-loader!css-loader" 
      }
    ]
  }
};
