/** https://github.com/gshigeto/ionic-environment-variables */
var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.IONIC_ENV;

function environmentPath(env) {
  console.log('IONIC_ENV: ' + env);
  // Default to dev config.
  if (!env) {
    env = 'dev';
  }
  var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

useDefaultConfig[env].resolve.alias = {
  "@env": path.resolve(environmentPath(env)),
  "@app": path.resolve('./src/app/'),
  "@assets": path.resolve('./src/assets/'),  
  "@pages": path.resolve('./src/pages/'),
  "@services": path.resolve('./src/services/'),
  "@models": path.resolve('./src/models/'),
  "@guards": path.resolve('./src/guards/'),
  "@pipes": path.resolve('./src/pipes/'),
  "@theme": path.resolve('./src/theme/'),
  "@node_modules": path.resolve('./node_modules/')
};

module.exports = function () {
  return useDefaultConfig;
};