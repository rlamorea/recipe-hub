const config = require('./config/config');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // required for feathers-mongoose
const service = require('feathers-mongoose');

// models
const Recipe = require('./models/Recipe');
const port = config.port;

async function initMongoose() {
    if (config.environment === 'test') {
        await config.mongo.init();
    }
    mongoose.connect(config.mongo.connectString, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => { /* do nothing */ })
        .catch((err) => {
            console.error(`connection: error: ${err}`);
        });
    const db = mongoose.connection;
    db.once('open', () => {
        console.info('MongoDB connected.');
        let r = new Recipe({ title: 'Test Recipe' });
        r.save();
    });
}
initMongoose();


const app = express(feathers());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use('recipes', service({ Model: Recipe }));

app.use(express.errorHandler());

const server = app.listen(port);

server.on('listening', () => console.log(`REST API started at http://localhost:${port}`));

process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');
    await app.shutdown();
});
process.on('SIGINT', async () => {
    console.info('SIGINT signal received.');
    await app.shutdown();
});

app.shutdown = async () => {
    console.log('REST API shutting down.');
    server.close();
    mongoose.disconnect().then( () => { /* do nothing */ });
    if (config.environment === 'test') {
        await config.mongo.close();
    }
};

module.exports = app;