var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(__dirname);
files.forEach(function (file) {
  if (path.extname(file) !== '.js' || file === 'index.js') return;
  exports[path.basename(file, '.js')] = require('./' + file);
});

