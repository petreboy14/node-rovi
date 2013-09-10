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
    for (var key2 in api[key]) {
      if (api[key].hasOwnProperty(key2)) {
        var map = api[key][key2];
        Rovi.prototype[map.method] = function(options, cb) {
          if (typeof(options) === 'function') {
            cb = options;
            options = {};
          }
          return roviRequest.makeRequest(this.key, this.secret, options, map, cb);
        }
      }
    }

  }
}

module.exports = Rovi;