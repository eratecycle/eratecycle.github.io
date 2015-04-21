/**
 * Default Configuration for all environments
 */
'use strict';

var _ = require('underscore');
var devConfig = require('./development');
var prodConfig = require('./production');

// All configurations will extend these options
var defaults = {
  apiRoot: 'http://localhost:9010'
};

// Export the config object based on the URL
var env = (location.hostname.indexOf('localhost') !== -1) ? devConfig : prodConfig;
module.exports = _.extend(defaults, env);
