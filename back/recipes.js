class Recipes {
    constructor() {
        this.recipes = [];
        this.currentId = 0;
    }

    async find(params) {
        return this.recipes;
    }

    async get(id, params) {
        const recipe = this.recipes.find(recipe => recipe.id === parseInt(id, 10));
        if (!recipe) {
            throw new Error(`Recipe with id ${id} not found.`);
        }
        return recipe;
    }

    async create(data, params) {
        const recipe = Object.assign({
            id: ++this.currentId
        }, data);
        this.recipes.push(recipe);
        return recipe;
    }

    async patch(id, data, params) {
        const recipe = await this.get(id);
        return Object.assign(recipe, data);
    }

    async remove(id, params) {
        const recipe = await this.get(id);
        const index = this.recipes.indexOf(recipe);
        this.recipes.splice(index, 1);
        return message;
    }
}

module.exports = new Recipes();
