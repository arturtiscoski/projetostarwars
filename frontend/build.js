const build = require('./node_modules/consys/build');
const config = require('./webpack.production');
const package = require('./package.json');

build({
  config,
  package,
  packagePath: './package.json'
});