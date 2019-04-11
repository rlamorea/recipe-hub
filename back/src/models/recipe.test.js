const Recipe = require('./recipe');
const config = require('../config/config');
const mongoose = require('mongoose');

beforeAll(async () => {
    await config.mongo.init();
    await mongoose.connect(config.mongo.connectString, { useNewUrlParser: true });
});

afterAll(async () => {
    mongoose.disconnect().then( () => { /* do nothing */ });
    await config.mongo.close();
});

describe('Recipe Model Tests', () => {
    test('in test environment', () => {
        expect(config.environment).toBe('test');
    });
    test('creates a recipe and saves it', () => {
        const r = new Recipe({ title: 'Testing 1' });
        expect(r.title).toBe('Testing 1');
        return r.save();
    });
    test('finds a recipe by title', () => {
        return Recipe.find({ title: 'Testing 1' }).then((rs) => {
            expect(rs.length).toBe(1);
            let r = rs[0];
            expect(r.title).toBe('Testing 1');
        });
    });
    test('updates a recipe title', () => {
        return Recipe.findOneAndUpdate({ title: 'Testing 1' }, { title: 'Testing-1' }, { new: true }).then( (r) => {
            expect(r.title).toBe('Testing-1');
        });
    });
    test ('removes a recipe by title', () => {
        return Recipe.deleteOne({ title: 'Testing-1' }).then( () => {
            return Recipe.findOne({ title: 'Testing-1' }).then( (r) => {
                expect(r).toBeNull();
            });
        })
    });
});
