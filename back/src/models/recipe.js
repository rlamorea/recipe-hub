const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const RecipeSchema = new mongoose.Schema({
    title: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;