const merge = require('lodash').merge;
const env = process.env.NODE_ENV || 'development';

if ([ 'development', 'production', 'test' ].indexOf(env) < 0) {
    throw new Error(`Invalid NODE_ENV: ${env}.  Forcing development`);
}

// set global config
const globalConfig = {
    environment: env,
    test: 'from global',
    port: 3030
};

// look up config file for environment and override existing configs
const config = merge(globalConfig, require(`./${env}`));
if (config.isAsync) {
    config.pushAsync(config);
}

module.exports = config;