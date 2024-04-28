const request = require('supertest');
const app = require('../../app');

describe('Launches Controller', () => {
    it('GET /launches returns all launches', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /launches adds a new launch', async () => {
        const newLaunch = {
            mission: 'Test Mission',
            rocket: 'Falcon 9',
            target: 'Kepler-186 f',
            launchDate: 'January 1, 2025',
        };
        const response = await request(app).post('/launches').send(newLaunch);
        expect(response.statusCode).toBe(200);
    });

    it('DELETE /launches/:id aborts a launch', async () => {
        const response = await request(app).delete('/launches/100');
        expect(response.statusCode).toBe(200);
    });
});
