const app = require('../app');
let request = require('supertest');

describe('Recipe Service Tests', () => {
    let rid = null;

    test('Create a recipe', () => {
        return request(app)
            .post('/recipes')
            .send({ title: 'Service Testing 1' })
            .set('Accept', 'application/json')
            .expect(201)
            .then( (res) => {
                expect(res.created).toBeTruthy();
                let r = res.body;
                expect(r.title).toBe('Service Testing 1');
                rid = r._id;
            })
    });
    test('Find a recipe', () => {
        return request(app)
            .get(`/recipes/${rid}`)
            .set('Accept', 'application/json')
            .expect(200)
            .then( (res) => {
                expect(res.notFound).toBeFalsy();
                let r = res.body;
                expect(r.title).toBe('Service Testing 1');
            });
    });
    test('List recipes', () => {
        return request(app)
            .get('/recipes')
            .set('Accept', 'application/json')
            .expect(200)
            .then( (res) => {
                expect(res.notFound).toBeFalsy();
                let rs = res.body;
                expect(rs.length).toBeGreaterThan(1);
                let r = rs[0];
                expect(r.title).toBe('Service Testing 1');
            });
    });
    test('Update a recipe', () => {
        return request(app)
            .put(`/recipes/${rid}`)
            .send({ title: 'Service-Testing-1'})
            .set('Accept', 'application/json')
            .expect(200)
            .then( (res) => {
                expect(res.notFound).toBeFalsy();
                let r = res.body;
                expect(r.title).toBe('Service-Testing-1');
            });
    });
    test('Delete a recipe', () => {
        return request(app)
            .delete(`/recipes/${rid}`)
            .expect(200)
            .then( (res) => {
                return request(app)
                    .get(`/recipes/${rid}`)
                    .set('Accept', 'application/json')
                    .expect(404)
                    .then( (res) => {
                        expect(res.notFound).toBeTruthy();
                    });
            });
    });
});