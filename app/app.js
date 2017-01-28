/*eslint-env node */

var express = require('express');
var app = express();

app.get('/', /* @callback */ function (req, res) {
  res.redirect('/toolkit.html');
});

app.use(express.static('app'));

app.listen(3000, function() { console.log('listening'); });