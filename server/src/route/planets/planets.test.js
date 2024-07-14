const request = require('supertest');
const app = require('../../app');
const mongoose = require("mongoose")
const mongooseConnect = require('../../services/mongo');
const loadPlanets = require("../../models/planets.model")

describe('Planets tests', () => {
    beforeAll(async () => {
        await mongooseConnect();
        await loadPlanets();
    });
    afterAll(async ()=> {
        await mongoose.disconnect();
    })

    test('Should return a json response with 200 status code', async () => {
        await request(app).get('/v1/planets').expect('Content-Type', /json/).expect(200);
    });

    test('Should return a list of planets', async () => { 
        const response = await request(app).get('/v1/planets');
        const planets = response.body;
        expect(planets.length).toBeGreaterThan(0);
    });
});
