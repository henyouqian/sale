var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, "dist", req.params["0"]));
// });
app.use(express.static("site"));


app.listen(3000, '192.168.2.55', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://192.168.2.55:3000');
});
