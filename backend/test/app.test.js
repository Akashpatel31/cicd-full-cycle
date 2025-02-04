import request from 'supertest';
import { expect } from 'chai';
import { app } from '../server.js'; // Adjust according to your export style

describe('GET /health', () => {
  it('should return a JSON response indicating if running in Docker', (done) => {
    request(app)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Verify that the response contains a "message" property
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
