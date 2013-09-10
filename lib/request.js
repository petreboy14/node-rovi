var concat = require('concat-stream');
var crypto = require('crypto');
var hyperquest = require('hyperquest');
var qs = require('querystring');

var api = require('./api');

var BASE_URI = 'http://api.rovicorp.com';
var HEADERS = {
  'Accept-Encoding': 'gzip,deflate'
};

function makeRequest(key, secret, options, lookup, cb) {
  var action = lookup.path;
  var resource = lookup.resource;
  var base = lookup.base;
  var version = lookup.version;
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

  var statusCode = null;
  hyperquest.get(uri, options, function(err, apiRes) {
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