// test-specific configuration

// test swaps the DB with a memory server, and that means we need to init
const MongodbMemoryServer = require('mongodb-memory-server').default;
const _ = require('lodash');
let mongod = null;
let globalConfig = null;

let config = {
    test: 'from test',
    port: 7357 + _.random(1234), // L337 TEST! :-)
    mongo: {
        connectString: null,
    },
    isAsync: true,
    pushAsync: (gc) => {
        globalConfig = gc;
        if (config.mongo.connectString) {
            gc.mongo.connectString = config.mongo.connectString;
        }
    }
};

config.mongo.init = async function () {
    if (!mongod) {
        mongod = new MongodbMemoryServer();
    }
    config.mongo.connectString = await mongod.getConnectionString();
    if (globalConfig) {
        globalConfig.mongo.connectString = config.mongo.connectString;
    }
};
config.mongo.init();

config.mongo.close = async function () {
    await mongod.stop();
};

module.exports = config;
