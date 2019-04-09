const feathers = require ('@feathersjs/feathers');
const express = require ('@feathersjs/express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // required for feathers-mongoose
const service = require('feathers-mongoose');

// models
const Recipe = require('./models/recipe');

const port = 3030;

mongoose.connect('mongodb://localhost/recipes', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error'));
db.once('open', () => {
    console.info('MongoDB connected.');
    var r = new Recipe({ title: 'Test Recipe' });
    r.save();
});

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

