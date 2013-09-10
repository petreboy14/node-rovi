var concat = require('concat-stream');
var crypto = require('crypto');
var hyperquest = require('hyperquest');
var qs = require('querystring');

var BASE_URI = 'http://api.rovicorp.com';
var reqOptions = {
  headers: {
    'Accept-Encoding': 'gzip,deflate'
  }
};

function makeRequest(key, secret, options, map, cb) {
  var action = map.path;
  var resource = map.resource;
  var base = map.base;
  var version = map.version;
  var sig = generateSig(key, secret);

  options = options || {};
  options.sig = sig;
  options.apikey = key;

  var uri = BASE_URI +
    '/' + base +
    '/' + version +
    '/' + resource +
    '/' + action +
    '?' + qs.stringify(options);
  console.log(uri);
  var statusCode = null;
  hyperquest.get(uri, reqOptions, function(err, apiRes) {
    if (err) {
      cb(err);
    } else {
      statusCode = apiRes.statusCode;
    }
  }).pipe(concat(function(data) {
    if (statusCode !== 200) {
      cb(new Error(data));
    } else {
      cb(null, data);
    }
  }));
}

function generateSig(key, secret) {
  var now = new Date().toGMTString();
  var utc = Date.parse(now) / 1000;
  var md5 = crypto.createHash('md5');
  md5.update(key + secret + utc);
  return md5.digest('hex');
}

exports.makeRequest = makeRequest;