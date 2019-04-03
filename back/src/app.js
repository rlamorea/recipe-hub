const feathers = require ('@feathersjs/feathers');
const express = require ('@feathersjs/express');
const recipes = require( './recipes');

const port = 3030;

const app = express(feathers());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

app.use('recipes', recipes);

app.use(express.errorHandler());

const server = app.listen(port);

app.service('recipes').create({
    title: 'Test Recipe',
    ingredients: [ '1 tsp Salt' ],
    steps: [ 'Add the salt.' ]
});

server.on('listening', () => console.log(`REST API started at http://localhost:${port}`));

