const request = require('supertest');
const app = require('../../app');

describe('Planets tests', ()=>{
    test('Should return a json response with 200 status code', async () => { 
        await request(app).get('/planets').expect('Content-Type', /json/).expect(200);
    });

    test('Should return a list of planets', async () => { 
        const response = await request(app).get('/planets');
        const planets = response.body;
        expect(planets.length).toBeGreaterThan(0);
    });
});
