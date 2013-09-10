var api = require('./lib/api');
var roviRequest = require('./lib/request');

var Rovi = function(config) {
  if (!config || !config.hasOwnProperty('key') && !config.hasOwnProperty('secret')) {
    throw new Error('Cannot create rovi object without valid key and shared secret');
  }

  this.key = config.key;
  this.secret = config.secret;

  return this;
};

for (var key in api) {
  if (api.hasOwnProperty(key)) {
    Rovi.prototype[api[key].method] = function(options, cb) {
      return roviRequest.makeRequest(this.key, this.secret, options, cb);
    }
  }
}

module.exports = Rovi;