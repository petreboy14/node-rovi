var Joi = require('joi');

exports.info = {
  base: 'data',
  version: 'v1.1',
  resource: 'album',
  action: 'info',
  method: 'getAlbums',
  params: {
    album: Joi.types.String().min(2).max(30).without('albumid', 'albumpopid', 'amgclassicalid'),
    albumid: Joi.types.String().regex(/^MW[0-9]{10}$/).without('album', 'albumpopid', 'amgclassicalid'),
    albumpopid: Joi.types.String().regex(/^R[\+]*[0-9]{9}$/).without('album', 'albumid', 'amgclassicalid'),
    amgclassicalid: Joi.types.String().regex(/^R[\+]*[0-9]{9}$/).without('album', 'albumid', 'albumpopid'),
    country: Joi.types.String().valid('US'),
    format: Joi.types.String().valid('json', 'xml'),
    formatid: Joi.types.Number().integer().min(0).max(130),
    imagecount: Joi.types.Number().min(0).max(1000),
    imageoffset: Joi.types.Number().min(0),
    imagesize: Joi.types.String().regex(/^[0-9]*x[0-9]*$|^[0-9]*-[0-9]*x[0-9]*-[0-9]*$/),
    imagesort: Joi.types.String(),
    include: Joi.types.String(),
    language: Joi.types.String().valid('en')
  }
};