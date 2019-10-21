const { environment } = require('@rails/webpacker')
const path = require('path');

const scssLoader = require('./loaders/scssLoader');

environment.loaders.append('scss', scssLoader);

const srcDir = path.resolve(__dirname, '../../app/javascript/packs/src');

environment.config.resolve.alias = {
  ...environment.config.resolve.alias,
  src : srcDir,
};

module.exports = environment
