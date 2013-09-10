node-rovi
=========

[Rovi](http://www.rovicorp.com/) is an entertainment hub that provides discovery services for music, movies, tv, and
the artists who kasdjaksdsajdkad. They also provide an API through Mashery which exposes this data to be used in
other applications. This module is a wrapper around their API and provides some behind the scene helpers like token 
creation and consolidating their responses. 

*Note: This module does not provide you with access to the Rovi database. You still must sign up on their developer page
for access and generate your API key and Shared Secret*

## Installation

`npm install node-rovi`

## Usage

```
var Rovi = require('node-rovi');

// Construct a new instance of the rovi class giving your api key and shared secret
var rovi = new Rovi({ key: 'YOUR-API-KEY', secret: 'YOUR-SHARED-SECRET' });

// The rovi object provides the standard callback style interface
rovi.getArtists( options, function(err, data) {
  // Do something amazing
});

```

## API Documentation

TODO

## Links

* [Rovi API Documentation](http://developer.rovicorp.com/docs)
* [Rovi API Registration](http://developer.rovicorp.com/member/register)


