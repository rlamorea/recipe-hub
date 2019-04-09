const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;