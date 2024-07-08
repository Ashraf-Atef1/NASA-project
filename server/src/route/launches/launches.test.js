const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const mongooseConnect = require('../../services/mongo');
const launchesDB = require("../../models/launches.mongo")
describe('Launches Controller', () => {
    beforeAll(async () => {
        await mongooseConnect();
    });
    afterAll(async ()=> {
        await mongoose.disconnect();
    })

    test('GET /launches returns all launches', async () => {
        const response = await request(app).get('/v1/launches');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /launches adds a new launch', async () => {
        const newLaunch = {
            mission: 'Test Mission from Jest.js',
            rocket: 'Falcon 9',
            target: 'Kepler-186 f',
            launchDate: 'January 1, 2025',
        };
        const response = await request(app).post('/v1/launches').send(newLaunch);
        expect(response.statusCode).toBe(200);
    });

    test('DELETE /launches/:id aborts a launch', async () => {
        let launches = await request(app).get('/v1/launches');
        launches = launches.body;
        launchNumber = launches.find(mission => mission.mission == 'Test Mission from Jest.js').flightNumber;
        const response = await request(app).delete(`/v1/launches/${launchNumber}`);
        await launchesDB.deleteOne({flightNumber: launchNumber});
        expect(response.statusCode).toBe(200);
    });
});
